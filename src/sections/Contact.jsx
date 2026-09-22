import React, { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { useInView } from '../hooks/useInView';
import { sendMessage } from '../lib/contact';

// Step machine: name -> contactMethod -> message -> submitting -> done | error
const PROMPTS = {
  name: "what's your name?",
  contactMethod: 'how can I reach you back? (email, LinkedIn, phone, Discord...)',
  message: "what's on your mind? (enter to send, shift+enter for a new line)",
};

const HOST = 'guest@drake-bellisari';

const LINE_CLASS = {
  prompt: 'text-blue-300',
  answer: 'text-gray-100 whitespace-pre-wrap',
  success: 'text-green-400',
  error: 'text-red-400',
  muted: 'text-gray-500',
};
const lineClass = (cls) => LINE_CLASS[cls] ?? LINE_CLASS.muted;

let lineId = 0;
const nextId = () => {
  lineId += 1;
  return lineId;
};

export default function Contact() {
  // The terminal boots the first time it scrolls into view, not at page load.
  // Typing four lines of copy while the visitor was still on the hero burned
  // main-thread time exactly when the hero animation needed it most.
  const [sectionRef, inView] = useInView({ threshold: 0.35, once: true });

  const [renderedLines, setRenderedLines] = useState([]); // { id, text, cls }
  const [typingLine, setTypingLine] = useState(null); // { id, text, shown, cls, onComplete }
  const [queue, setQueue] = useState([]); // pending lines to type

  const [step, setStep] = useState('name');
  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({ name: '', contactMethod: '', message: '' });

  const inputRef = useRef(null);
  const textareaRef = useRef(null);
  const bodyRef = useRef(null);
  const bootedRef = useRef(false);
  // Focus is only ever moved once the visitor has clicked into the terminal.
  // Programmatic focus on an off-screen input is how browsers used to get
  // dragged down to this section in the middle of a scroll.
  const engagedRef = useRef(false);

  // ── typewriter engine ────────────────────────────────────
  const pushLine = useCallback((text, cls, onComplete) => {
    setQueue((q) => [...q, { id: nextId(), text, cls, onComplete }]);
  }, []);

  const pushInstant = useCallback((text, cls) => {
    setRenderedLines((lines) => [...lines, { id: nextId(), text, cls }]);
  }, []);

  const pushPrompt = useCallback(
    (fieldStep) => {
      pushLine(PROMPTS[fieldStep], 'prompt', () => setInputEnabled(true));
    },
    [pushLine],
  );

  useEffect(() => {
    if (typingLine || queue.length === 0) return;
    const [next, ...rest] = queue;
    setQueue(rest);
    setTypingLine({ ...next, shown: '' });
  }, [queue, typingLine]);

  useEffect(() => {
    if (!typingLine) return undefined;
    if (typingLine.shown.length >= typingLine.text.length) {
      setRenderedLines((lines) => [...lines, { id: typingLine.id, text: typingLine.text, cls: typingLine.cls }]);
      const done = typingLine.onComplete;
      setTypingLine(null);
      if (done) done();
      return undefined;
    }
    const timer = setTimeout(() => {
      setTypingLine((current) => current && { ...current, shown: current.text.slice(0, current.shown.length + 1) });
    }, 14 + Math.random() * 16);
    return () => clearTimeout(timer);
  }, [typingLine]);

  // ── boot sequence (once, when the terminal is on screen) ──
  useEffect(() => {
    if (!inView || bootedRef.current) return;
    bootedRef.current = true;
    pushLine('Last login: today on ttys001', 'muted');
    pushLine('guest@drake-bellisari ~ % ./contact.sh', 'muted');
    pushLine('booting secure contact form... done.', 'muted');
    pushLine("type 'help' any time to see available commands.", 'muted');
    pushPrompt('name');
  }, [inView, pushLine, pushPrompt]);

  // ── keep the newest line in view (inside the terminal only) ──
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [renderedLines, typingLine, inputValue]);

  // ── focus management ─────────────────────────────────────
  const activeField = useCallback(
    () => (step === 'message' ? textareaRef.current : inputRef.current),
    [step],
  );

  useEffect(() => {
    if (!inputEnabled || !engagedRef.current) return;
    activeField()?.focus({ preventScroll: true });
  }, [inputEnabled, step, activeField]);

  const engage = () => {
    engagedRef.current = true;
    activeField()?.focus({ preventScroll: true });
  };

  // ── submission ────────────────────────────────────────────
  const doSubmit = async (data) => {
    setStep('submitting');
    setInputEnabled(false);
    pushInstant('sending message...', 'muted');
    try {
      await sendMessage(data);
      pushLine("message sent — I'll get back to you soon.", 'success', () => {
        setStep('done');
        pushLine("type 'reset' to send another message.", 'muted', () => setInputEnabled(true));
      });
    } catch (err) {
      pushLine('something went wrong sending your message.', 'error', () => {
        setStep('error');
        pushLine("type 'retry' to try again, or 'reset' to start over.", 'muted', () => setInputEnabled(true));
      });
    }
  };

  const resetAll = () => {
    setFormData({ name: '', contactMethod: '', message: '' });
    setRenderedLines([]);
    setQueue([]);
    setTypingLine(null);
    setInputEnabled(false);
    setInputValue('');
    setStep('name');
    pushLine('session reset.', 'muted');
    pushPrompt('name');
  };

  const clearScreen = (fieldStep) => {
    setRenderedLines([]);
    setQueue([]);
    setTypingLine(null);
    pushInstant(PROMPTS[fieldStep], 'prompt');
  };

  // ── input handling ────────────────────────────────────────
  const handleFieldSubmit = (raw) => {
    const value = raw;
    const trimmed = value.trim();
    const lower = trimmed.toLowerCase();

    // meta commands available on the short single-line fields
    if (step !== 'message') {
      if (lower === 'help') {
        pushInstant(`$ ${value}`, 'answer');
        pushInstant('commands: help, clear, reset  —  fields: name, contact method, message', 'muted');
        setInputValue('');
        return;
      }
      if (lower === 'clear') {
        clearScreen(step);
        setInputValue('');
        return;
      }
    }

    if (step === 'done' || step === 'error') {
      pushInstant(`$ ${value}`, 'answer');
      setInputValue('');
      if (lower === 'reset') {
        resetAll();
      } else if (lower === 'retry' && step === 'error') {
        doSubmit(formData);
      } else if (lower === 'help') {
        pushInstant('commands: reset, retry', 'muted');
      } else if (trimmed !== '') {
        pushInstant(`zsh: command not found: ${trimmed}`, 'error');
      }
      return;
    }

    if (trimmed === '') {
      pushInstant('⚠ this field cannot be empty.', 'error');
      return;
    }

    if (step === 'name') {
      pushInstant(`$ ${value}`, 'answer');
      setFormData((f) => ({ ...f, name: trimmed }));
      setInputValue('');
      setInputEnabled(false);
      setStep('contactMethod');
      pushPrompt('contactMethod');
      return;
    }

    if (step === 'contactMethod') {
      pushInstant(`$ ${value}`, 'answer');
      setFormData((f) => ({ ...f, contactMethod: trimmed }));
      setInputValue('');
      setInputEnabled(false);
      setStep('message');
      pushPrompt('message');
      return;
    }

    if (step === 'message') {
      value.split('\n').forEach((line, i) => {
        pushInstant(`${i === 0 ? '» ' : '  '}${line}`, 'answer');
      });
      const finalData = { ...formData, message: trimmed };
      setFormData(finalData);
      setInputValue('');
      setInputEnabled(false);
      doSubmit(finalData);
    }
  };

  const onKeyDown = (event) => {
    engagedRef.current = true;
    if (event.key === 'Enter') {
      if (step === 'message' && event.shiftKey) return; // allow newline
      event.preventDefault();
      handleFieldSubmit(inputValue);
    }
  };

  const isTextarea = step === 'message';
  const currentSymbol = isTextarea ? '»' : '$';
  const fieldLabel = PROMPTS[step] ?? 'command';

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-20 bg-gray-900">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="display-heading display-heading-outline text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-10 text-center text-white">
            Let's Talk
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="rounded-lg overflow-hidden shadow-2xl border border-gray-700/60 bg-[#0b0e14]"
            onClick={engage}
          >
            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-gray-700/50">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
              <span className="flex-1 text-center text-[11px] sm:text-xs text-gray-400 font-mono select-none">
                {HOST}: ~/contact
              </span>
            </div>

            {/* body */}
            <div
              ref={bodyRef}
              role="log"
              aria-live="polite"
              className="font-mono text-[12.5px] sm:text-sm leading-relaxed px-4 sm:px-6 py-4 sm:py-5 h-[420px] sm:h-[440px] overflow-y-auto cursor-text"
            >
              {renderedLines.map((line) => (
                <div key={line.id} className={lineClass(line.cls)}>
                  {line.text}
                </div>
              ))}

              {typingLine && (
                <div className={lineClass(typingLine.cls)}>
                  {typingLine.shown}
                  <span className="caret" aria-hidden="true" />
                </div>
              )}

              {!typingLine && inputEnabled && (
                <div className="flex items-start gap-2 text-gray-100">
                  <span className="text-green-400 flex-shrink-0 select-none" aria-hidden="true">
                    {HOST}:{currentSymbol}
                  </span>
                  {isTextarea ? (
                    <textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={onKeyDown}
                      rows={Math.min(6, Math.max(1, inputValue.split('\n').length))}
                      className="flex-1 bg-transparent outline-none border-none resize-none font-mono text-gray-100 placeholder-gray-600 caret-blue-400"
                      placeholder="type your message..."
                      aria-label={fieldLabel}
                      autoComplete="off"
                      spellCheck="false"
                    />
                  ) : (
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                      onKeyDown={onKeyDown}
                      className="flex-1 bg-transparent outline-none border-none font-mono text-gray-100 placeholder-gray-600 caret-blue-400"
                      aria-label={fieldLabel}
                      autoComplete="off"
                      spellCheck="false"
                      autoCapitalize="off"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <p className="mt-3 text-xs text-gray-500 font-mono">click the terminal, type your answer, press enter.</p>
      </div>
    </section>
  );
}

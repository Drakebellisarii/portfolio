import React from 'react';
import FlowDiagram from './FlowDiagram';
import calendar from './specs/calendar';
import context from './specs/context';
import crm from './specs/crm';
import outbox from './specs/outbox';
import security from './specs/security';
import signin from './specs/signin';
import slack from './specs/slack';

export const SystemContext = () => <FlowDiagram spec={context} />;
export const SignInAccess = () => <FlowDiagram spec={signin} />;
export const SlackPipeline = () => <FlowDiagram spec={slack} />;
export const CalendarMerge = () => <FlowDiagram spec={calendar} />;
export const PortalsCrm = () => <FlowDiagram spec={crm} />;
export const OutboxDelivery = () => <FlowDiagram spec={outbox} />;
export const SecurityLayers = () => <FlowDiagram spec={security} />;

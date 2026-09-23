import { AskHub, ChatChannel, CheckIn, CommandPalette, Directory, Discovery, GoalsScorecard, HubBefore, HubHome, MobileTabBar, PilotTimeline, ScatteredTools } from './HubVisuals';
import { AssetLibrary, DealRegistration, DealThread, FigmaBoard, InvestorSignIn, PartnerDashboard, PartnerTypes } from './PortalVisuals';
import { B2BFlow, EcosystemDiagram, IsolationDiagram, SignInFlow } from './Diagrams';

/**
 * Every visual the content file can name. `recreation` visuals are UI rebuilt
 * in code with fictional data and carry a caption saying so; diagrams and
 * illustrations do not need one.
 */
export const VISUALS = {
  HubHome: { C: HubHome, recreation: true },
  HubBefore: { C: HubBefore, recreation: true },
  Discovery: { C: Discovery },
  CommandPalette: { C: CommandPalette, recreation: true },
  MobileTabBar: { C: MobileTabBar, recreation: true },
  CheckIn: { C: CheckIn, recreation: true },
  ChatChannel: { C: ChatChannel, recreation: true },
  GoalsScorecard: { C: GoalsScorecard, recreation: true },
  Directory: { C: Directory, recreation: true },
  AskHub: { C: AskHub, recreation: true },
  ScatteredTools: { C: ScatteredTools },
  PilotTimeline: { C: PilotTimeline, recreation: true },
  PartnerDashboard: { C: PartnerDashboard, recreation: true },
  PartnerTypes: { C: PartnerTypes },
  FigmaBoard: { C: FigmaBoard, recreation: true },
  DealRegistration: { C: DealRegistration, recreation: true },
  DealThread: { C: DealThread, recreation: true },
  AssetLibrary: { C: AssetLibrary, recreation: true },
  InvestorSignIn: { C: InvestorSignIn, recreation: true },
  EcosystemDiagram: { C: EcosystemDiagram },
  SignInFlow: { C: SignInFlow },
  IsolationDiagram: { C: IsolationDiagram },
  B2BFlow: { C: B2BFlow },
};

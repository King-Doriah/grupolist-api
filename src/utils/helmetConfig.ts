import helmet from "helmet";

const helmetConfig = helmet({
  noSniff: false,
  xssFilter: true,
  xFrameOptions: false,
  xPoweredBy: false,
  xDownloadOptions: false,
  contentSecurityPolicy: false,
  xDnsPrefetchControl: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  xPermittedCrossDomainPolicies: false,
  strictTransportSecurity: false,
  referrerPolicy: false,
  originAgentCluster: false,
});

export default helmetConfig;

type A2ADispatcher = {
  name: string;
  detection: {
    prefixes: string[];
  };
  border: {
    name: string;
  };
  engageRadius: number;
  squadrons: {
    name: string;
    map: "Caucasus" | "Nevada" | "Normandy" | "PersianGulf";
    airbase: string;
    groupLength: number;
    takeofMethod: "Air" | "Runway" | "Hot" | "Cold";
    landingMethod: "Air" | "Runway" | "Hot" | "Cold";
    cap?: {
      zoneName: string;
      minCAPAlt: number;
      maxCAPAlt: number;
      minCAPSpeed: number;
      maxCAPSPeed: number;
      minCAPInterceptSpeed: number;
      maxCAPInterceptSpeed: number;
      mesureType: "BARO" | "RADIO";
      numberPerGroup: number;
      lowerCheckTime: number;
      upperCheckTime: number;
      decisionWeight: number;
    };
    gci?: {
      minInterceptSpeed: number;
      maxInterceptSpeed: number;
    };
  }[];
};

export default A2ADispatcher;

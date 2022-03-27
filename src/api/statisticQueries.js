import { gql } from "@apollo/client";

export const ASSETS_BY_STATUS = gql`
  {
    assetsStatistics {
      assetsByField(field: "status") {
        field
        assets
      }
    }
  }
`;
export const ASSETS_HEALTH_LEVEL_BY_STATUS = gql`
  {
    assetsStatistics {
      assetsHealthLevelByField(field: "status") {
        field
        health_level
      }
    }
  }
`;

export const ASSETS_BY_UNIT = gql`
  {
    assetsStatistics {
      assetsByField(field: "unit") {
        field
        assets
      }
    }
  }
`;
export const ASSETS_HEALTH_LEVEL_BY_UNIT = gql`
  {
    assetsStatistics {
      assetsHealthLevelByField(field: "unit") {
        field
        health_level
      }
    }
  }
`;

export const TOP_CARD_HOME = gql`
{
  assetsStatistics {
    companies
    assets
    units
    averageHealthLevelAsset
    lowerHealthLevelAsset {
      name
      health_level
    }
  }
}

`;

export const AVERAGE_HEALTH_LEVEL_ASSET = gql`
{
  assetsStatistics {
    averageHealthLevelAsset
  }
}

`;

export const ASSETS_HEALTH_LEVEL_HISTORY = gql`
{
  assetsStatistics {
    healthLevelHistory {
      datetime
      health_level
    }
  }
}
`;

export const ASSETS_BY_HEALTH_LEVEL = gql`
{
  assetsStatistics {
    assetsByHealthLevel {
      assets
      health_level
    }
  }
}
`;
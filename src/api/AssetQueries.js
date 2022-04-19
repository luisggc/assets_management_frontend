import { gql } from "@apollo/client";

export const ASSETS = gql`
  query Assets {
    assets {
      _id
      name
      image
      description
      model
      owner
      status
      health_level
      unit {
        _id
        name
      }
    }
  }
`;

export const DELETE_ASSET = gql`
  mutation DeleteAsset($_id: ID!) {
    deleteAsset(_id: $_id) {
      _id
    }
  }
`;

export const ADD_ASSET = gql`
mutation CreateAsset($name: String!, $image: String!, $description: String!, $model: String!, $owner: String!, $status,: statusAsset! $health_level: Float!, $unit: String!) {
  createAsset(AssetInput:{name: $name, image: $image, description: $description, model: $model, owner: $owner, status: $status, health_level: $health_level, unit: $unit}) {
    _id
    name
    image
    description
    model
    owner
    status
    health_level
    unit {
      _id
      name
    }
  }
}
`;

export const EDIT_ASSET = gql`
mutation EditAsset($_id: ID!, $name: String!, $image: String!, $description: String!, $model: String!, $owner: String!, $status: statusAsset!, $health_level: Float!, $unit: String!) {
  editAsset(_id: $_id, AssetInput:{name: $name, image: $image, description: $description, model: $model, owner: $owner, status: $status, health_level: $health_level, unit: $unit}) {
      _id
      name
      image
      description
      model
      owner
      status
      health_level
      unit {
        _id
        name
      }
    }
}
`;

export const ASSETS_LOGS = gql`
  query AssetsLogs {
    assetsLogs {
      _id
      type
      datetime
      asset{
      name
      }
      responsible{
        name
      }
      value
      updatedAt
      createdAt
    }
  }
`;

export const queryGetAssetsLogs = `{
  assetsLogs {
    _id
    type
    datetime
    asset{
    name
    }
    responsible{
      name
    }
    value
    updatedAt
    createdAt
  }
}`;


export const ASSETS_LOG = gql`
  query AssetsLog($_id: ID!) {
    assetsLog(_id: $_id) {
      _id
      type
      datetime
      asset{
      name
      }
      responsible{
        name
      }
      value
      updatedAt
      createdAt
      }
  }
`;


export const queryGetAssetsLog = (asset_id) => `{
  assetsLog(_id: "${asset_id}") {
    _id
    type
    datetime
    asset{
    name
    }
    responsible{
      name
    }
    value
    updatedAt
    createdAt
  }
}`;

export const ADD_ASSET_LOG = gql`
  mutation CreateAssetLog($type: String!, $datetime: String!, $asset: ID!, $responsible: String!, $value: Float!) {
    createAssetLog(AssetLogInput:{type: $type, datetime: $datetime, asset: $asset, responsible: $responsible, value: $value}) {
        _id
        type
        datetime
        asset{
        name
        }
        responsible{
          name
        }
        value
        updatedAt
        createdAt
      }
  }
`;

export const queryAddAssetLog = (inputData) => `mutation {
    createAssetLog(AssetLogInput: {type: ${inputData.type}, datetime: "${inputData.datetime}", asset: "${inputData.asset}", responsible: "${inputData.responsible}", value: ${inputData.value}}){
      _id
    }
}`;

export const DELETE_ASSET_LOG = gql`
  mutation DeleteAssetLog($_id: ID!) {
    deleteAssetLog(_id: $_id) {
      _id
    }
  }
`;

export const queryDeleteAssetLog = (_id) => `mutation {
  deleteAssetLog(_id: "${_id}"){
    _id
  }
}`;

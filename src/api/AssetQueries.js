export const queryGetAssets = `{
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
}`;

export const queryDeleteAsset = (_id) => `mutation {
  deleteAsset(_id: "${_id}")
}`;

export const queryAddAsset = (inputData) => `mutation {
        createAsset(AssetInput:{name: "${inputData.name}", image: "${inputData.image}", description: "${inputData.description}", model: "${inputData.model}", owner: "${inputData.owner}", status: ${inputData.status}, health_level: ${inputData.health_level}, unit: "${inputData.unit}"}) {
          _id
          }
      }`;

export const queryEditAsset = (inputData) => `mutation {
  editAsset(_id: "${inputData._id}", AssetInput: {name: "${inputData.name}", image: "${inputData.image}", description: "${inputData.description}", model: "${inputData.model}", owner: "${inputData.owner}", status: ${inputData.status}, health_level: ${inputData.health_level}, unit: "${inputData.unit}"}) {
      _id
  }
}`;

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

export const queryAddAssetLog = (inputData) => `mutation {
    createAssetLog(AssetLogInput: {type: ${inputData.type}, datetime: "${inputData.datetime}", asset: "${inputData.asset}", responsible: "${inputData.responsible}", value: ${inputData.value}}){
      _id
    }
}`;

export const queryDeleteAssetLog = (_id) => `mutation {
  deleteAssetLog(_id: "${_id}"){
    _id
  }
}`;

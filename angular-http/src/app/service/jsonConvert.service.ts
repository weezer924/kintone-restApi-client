import { Injectable } from '@angular/core';

@Injectable()
export class JsonConverter {

  public jsonParseToModel(inputModel: any, jsonObject: object) {
    const modelKeys = Object.keys(inputModel);

    Object.keys(jsonObject).forEach(key => {
      if (modelKeys.find(str => str === key)) {
        if (jsonObject[key].value instanceof Array) {
          const modelArray = new Array();
          for (const valueOne of jsonObject[key].value) {
            if (valueOne.value) {
              const valueArray = new Object();
              Object.keys(valueOne.value).forEach(valueOnekey => {
                valueArray[valueOnekey] = valueOne.value[valueOnekey].value;
              });
              modelArray.push(valueArray);
            } else {
              modelArray.push(valueOne);
            }
          }
          inputModel[key] = modelArray;
        } else {
          inputModel[key] = jsonObject[key].value;
        }
      }
    });
  }

  public jsonParseToArrayModel(inputModel: any, jsonObject: object) {
    const modelKeys = Object.keys(inputModel);

    Object.keys(jsonObject).forEach(key => {
      if (modelKeys.some(str => str === key )) {
        if (inputModel[key] instanceof Array) {
          inputModel[key].push(jsonObject[key].value);
        } else {
          inputModel[key] = jsonObject[key].value;
        }
      }
    });
  }

  public modelToJsonObject(inputModel: any, jsonObject: object) {
    const model = Object.assign({}, inputModel);
    Object.keys(model).forEach(key => {
      // Key 'id' is not need to be update
      if (key === 'id' || model[key] === undefined) {
        return;
      }

      // Make sure each object in the json is like { value: 'something' } as kintone need
      if (model[key] instanceof Array) {
        const modelArray = new Array();
        for (const valueOne of model[key]) {
          if (valueOne instanceof Object) {
            const jsonData = new Object();
            Object.keys(valueOne).forEach(valueOnekey => {
              jsonData[valueOnekey] = { value: valueOne[valueOnekey] };
            });
            modelArray.push({ value: jsonData });
          } else {
            modelArray.push(valueOne);
          }
        }
        model[key] = modelArray;
      }
      jsonObject[key] = { value: model[key] };
    });
  }

  public arrayModelToJsonObject(inputModel: any, jsonObject: object) {
    const model = Object.assign({} , inputModel);

    Object.keys(model).forEach(key => {
      if (key !== 'id' && model[key] instanceof Array) {
        if (model[key].length > 1 && model[key][1]) {
          jsonObject[key] = { value: model[key][1] };
        }
      } else {
        jsonObject[key] = { value: model[key] };
      }
    });
  }
}

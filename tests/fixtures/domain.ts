import { AggregateRoot, Event } from '../../src';

export class EngineReplaced extends Event {
  aggregateName = 'car';
  eventName = 'car/engine-replaced';

  constructor(public guid: string, public engineCode: string) {
    super(guid);
  }
}

export class Car extends AggregateRoot {
  private _make: string;
  private _model: string;
  private _engineCode: string;
  private _hasStarted = false;

  get make() {
    return this._make;
  }

  get model() {
    return this._model;
  }

  get engineCode() {
    return this._engineCode;
  }

  get hasStarted() {
    return this._hasStarted;
  }

  private constructor(make: string, model: string, engineCode: string, id = 'xxxxx') {
    super(id);
    this._make = make;
    this._model = model;
    this._engineCode = engineCode;
  }

  public replaceEngine(engineCode: string) {
    this._engineCode = engineCode;
    this.applyChange(new EngineReplaced(this.guid, engineCode));
  }

  public applyEngineReplaced(event: EngineReplaced) {
    this._engineCode = event.engineCode;
  }

  public static create(make: string, model: string, engineCode: string) {
    return new Car(make, model, engineCode);
  }

  public static createWithId(id: string, make: string, model: string, engineCode: string) {
    return new Car(make, model, engineCode, id);
  }
}

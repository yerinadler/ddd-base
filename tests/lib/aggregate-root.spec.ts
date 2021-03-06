import { Car, EngineReplaced } from '../fixtures/domain';

describe('Aggregate Root', () => {
  describe('Object instantiation', () => {
    it('Should instantiate correctly', () => {
      expect(() => Car.create('honda', 'civic', 'e:hev')).not.toThrow();
    });
    it('Should instantiate with correctly assigned id', () => {
      const car = Car.create('honda', 'civic', 'e:hev');
      expect(car.guid).toBeDefined();
    });
    it('Should instantiate with manually assigned id (to be used in repositories)', () => {
      const car = Car.createWithId('1234', 'honda', 'civic', 'e:hev');
      expect(car.guid).toBe('1234');
    });
  });
  describe('Event management', () => {
    let car: Car;

    beforeEach(() => {
      car = Car.create('honda', 'civic', 'e:hev');
    });
    it('Should keep track of events previously dispatched', () => {
      car.replaceEngine('i-vtec');
      expect(car.getUncommittedEvents()).toHaveLength(1);
    });
    it('Should track a correct event type', () => {
      car.replaceEngine('i-vtec');
      expect(car.getUncommittedEvents()[0]).toBeInstanceOf(EngineReplaced);
    });
    it('Should clear events once committed', () => {
      car.replaceEngine('i-vtec');
    });
    it('Should trigger state transition correctly', () => {
      car.replaceEngine('i-vtec');
      expect(car.engineCode).toBe('i-vtec');
    });
  });

  describe('Event name extraction', () => {
    let car: Car;
    let carSpy: jest.SpyInstance;
    beforeEach(() => {
      car = Car.create('bmw', '330e', 'XTM-9638');
      carSpy = jest.spyOn(car, 'applyEngineReplaced');
      car.replaceEngine('XTM-2000');
    });
    it('Should extract the correct handler name', () => {
      expect(car.getUncommittedEvents()[0].eventName).toBe('car/engine-replaced');
    });
    it('Should call state transition with the correct event', () => {
      expect(carSpy).toHaveBeenCalled();
    });
  });
});

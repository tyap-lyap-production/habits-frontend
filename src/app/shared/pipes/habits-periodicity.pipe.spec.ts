
import { HabitPeriodicity } from '../../habits-list/habits-list.component';
import { HabitPeriodicityPipe } from './habits-periodicity.pipe';

describe('HabitPeriodicityPipe', () => {
  let pipe: HabitPeriodicityPipe;

  beforeEach(() => {
    pipe = new HabitPeriodicityPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform HabitPeriodicity.daily to "Каждый день"', () => {
    const result = pipe.transform(HabitPeriodicity.daily);
    expect(result).toBe('Каждый день');
  });

  it('should transform HabitPeriodicity.weekly to "Каждую неделю"', () => {
    const result = pipe.transform(HabitPeriodicity.weekly);
    expect(result).toBe('Каждую неделю');
  });

  it('should transform HabitPeriodicity.monthly to "Каждый месяц"', () => {
    const result = pipe.transform(HabitPeriodicity.monthly);
    expect(result).toBe('Каждый месяц');
  });

  it('should return an empty string for an invalid HabitPeriodicity', () => {
    const result = pipe.transform('invalid' as HabitPeriodicity);
    expect(result).toBe('');
  });
});
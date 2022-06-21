import { ShortURLPipe } from './short-url.pipe';

describe('ShortURLPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortURLPipe();
    expect(pipe).toBeTruthy();
  });
});

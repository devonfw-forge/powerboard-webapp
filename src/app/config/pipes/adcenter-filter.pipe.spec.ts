import { ADcenterFilterPipe } from './adcenter-filter.pipe';

describe('ADcenterFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ADcenterFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method', () =>{
    const pipe = new ADcenterFilterPipe();
    expect(pipe.transform("Hello World")).toEqual("World");
  })
  it('check for mull in tranform method', ()=>{
    const pipe = new ADcenterFilterPipe();
    expect(pipe.transform(null)).toEqual(null);
  })

  it('check for undefined in tranform method', ()=>{
    const pipe = new ADcenterFilterPipe();
    expect(pipe.transform(undefined)).toEqual(undefined);
  })
});

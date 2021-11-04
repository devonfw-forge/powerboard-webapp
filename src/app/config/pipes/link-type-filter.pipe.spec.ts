import { LinkTypeFilterPipe } from './link-type-filter.pipe';

describe('LinkTypeFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new LinkTypeFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method', () =>{
    const pipe = new LinkTypeFilterPipe();
    expect(pipe.transform("meeting_link")).toEqual("meeting link");
  })
  it('check for mull in tranform method', ()=>{
    const pipe = new LinkTypeFilterPipe();
    expect(pipe.transform(null)).toEqual(null);
  })

  it('check for undefined in tranform method', ()=>{
    const pipe = new LinkTypeFilterPipe();
    expect(pipe.transform(undefined)).toEqual(undefined);
  })
});

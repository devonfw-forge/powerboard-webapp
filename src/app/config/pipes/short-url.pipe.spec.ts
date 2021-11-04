import { ShortUrlPipe } from './short-url.pipe';

describe('ShortUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortUrlPipe();
    expect(pipe).toBeTruthy();
  });

  it('check transform method for len more than 30', () =>{
    const pipe = new ShortUrlPipe();
    expect(pipe.transform("meeting_link")).toEqual("meeting_link");
  })
  it('check transform method for len less than 30', () =>{
    const pipe = new ShortUrlPipe();
    expect(pipe.transform("a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t")).toEqual("a_b_c_d_e_f_g_h_i_j_k...p_q_r_s_t");
  })
  it('check for mull in tranform method', ()=>{
    const pipe = new ShortUrlPipe();
    expect(pipe.transform(null)).toEqual(null);
  })

  it('check for undefined in tranform method', ()=>{
    const pipe = new ShortUrlPipe();
    expect(pipe.transform(undefined)).toEqual(undefined);
  })
});

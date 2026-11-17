import { describe, it, expect } from 'vitest';
import { calculateSingleDigitTrachtenberg } from '../engines/singleDigitEngine';

describe('Chapter 1 Trachtenberg Basic Multiplication', () => {
  it('multiplies by 11 correctly matching book worked examples', () => {
    expect(calculateSingleDigitTrachtenberg('633', 11).answerString).toBe('6963');
    expect(calculateSingleDigitTrachtenberg('721324', 11).answerString).toBe('7934564');
    expect(calculateSingleDigitTrachtenberg('441362', 11).answerString).toBe('4854982');
    expect(calculateSingleDigitTrachtenberg('1754', 11).answerString).toBe('19294');
    expect(calculateSingleDigitTrachtenberg('715624', 11).answerString).toBe('7871864');
    expect(calculateSingleDigitTrachtenberg('98834', 11).answerString).toBe('1087174');
  });

  it('multiplies by 12 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('413', 12).answerString).toBe('4956');
    expect(calculateSingleDigitTrachtenberg('63247', 12).answerString).toBe('758964');
    expect(calculateSingleDigitTrachtenberg('4232', 12).answerString).toBe('50784');
    expect(calculateSingleDigitTrachtenberg('47492', 12).answerString).toBe('569904');
  });

  it('multiplies by 6 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('622084', 6).answerString).toBe('3732504');
    expect(calculateSingleDigitTrachtenberg('4404', 6).answerString).toBe('26424');
    expect(calculateSingleDigitTrachtenberg('28688424', 6).answerString).toBe('172130544');
    expect(calculateSingleDigitTrachtenberg('443052', 6).answerString).toBe('2658312');
    expect(calculateSingleDigitTrachtenberg('8234', 6).answerString).toBe('49404');
    expect(calculateSingleDigitTrachtenberg('6250188', 6).answerString).toBe('37501128');
    expect(calculateSingleDigitTrachtenberg('8', 6).answerString).toBe('48');
    expect(calculateSingleDigitTrachtenberg('7', 6).answerString).toBe('42');
  });

  it('multiplies by 7 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('4242', 7).answerString).toBe('29694');
    expect(calculateSingleDigitTrachtenberg('3412', 7).answerString).toBe('23884');
    expect(calculateSingleDigitTrachtenberg('223', 7).answerString).toBe('1561');
    expect(calculateSingleDigitTrachtenberg('302', 7).answerString).toBe('2114');
    expect(calculateSingleDigitTrachtenberg('254', 7).answerString).toBe('1778');
  });

  it('multiplies by 5 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('426', 5).answerString).toBe('2130');
    expect(calculateSingleDigitTrachtenberg('436', 5).answerString).toBe('2180');
    expect(calculateSingleDigitTrachtenberg('444', 5).answerString).toBe('2220');
    expect(calculateSingleDigitTrachtenberg('428', 5).answerString).toBe('2140');
    expect(calculateSingleDigitTrachtenberg('424882', 5).answerString).toBe('2124410');
  });

  it('multiplies by 9 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('8769', 9).answerString).toBe('78921');
    expect(calculateSingleDigitTrachtenberg('8888', 9).answerString).toBe('79992');
    expect(calculateSingleDigitTrachtenberg('33', 9).answerString).toBe('297');
    expect(calculateSingleDigitTrachtenberg('98654', 9).answerString).toBe('887886');
    expect(calculateSingleDigitTrachtenberg('86733', 9).answerString).toBe('780597');
    expect(calculateSingleDigitTrachtenberg('626', 9).answerString).toBe('5634');
    expect(calculateSingleDigitTrachtenberg('805', 9).answerString).toBe('7245');
    expect(calculateSingleDigitTrachtenberg('7754965', 9).answerString).toBe('69794685');
  });

  it('multiplies by 8 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('789', 8).answerString).toBe('6312');
    expect(calculateSingleDigitTrachtenberg('73', 8).answerString).toBe('584');
    expect(calculateSingleDigitTrachtenberg('49', 8).answerString).toBe('392');
    expect(calculateSingleDigitTrachtenberg('69', 8).answerString).toBe('552');
    expect(calculateSingleDigitTrachtenberg('98', 8).answerString).toBe('784');
    expect(calculateSingleDigitTrachtenberg('7777', 8).answerString).toBe('62216');
  });

  it('multiplies by 4 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('20684', 4).answerString).toBe('82736');
    expect(calculateSingleDigitTrachtenberg('365187', 4).answerString).toBe('1460748');
    expect(calculateSingleDigitTrachtenberg('2688', 4).answerString).toBe('10752');
    expect(calculateSingleDigitTrachtenberg('860442', 4).answerString).toBe('3441768');
  });

  it('multiplies by 3 correctly matching book examples', () => {
    expect(calculateSingleDigitTrachtenberg('2588', 3).answerString).toBe('7764');
  });
});


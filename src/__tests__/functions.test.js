// @flow strict

import { number, positiveNumber } from '../number';
import { func2 } from '../functions';
import { guard } from '../guard';

function add(x, y) {
    return x + y;
}

function greet(name) {
    return 'Hello ' + name + '!';
}

describe('func2', () => {
    const verify = guard(func2(number, number, number));

    it('valid', () => {
        expect(typeof verify(add)).toBe('function');
        expect(typeof verify(greet)).toBe('function');
    });

    it('valid, but will throw runtime exceptions', () => {
        const f = verify(add);
        expect(f(2, -82)).toBe(-80);
        // expect(verify(greet)('Vincent')).toBe('Hello Vincent!');
        expect(verify(() => 'wrong')(2, 2)).toBe(4);
    });

    it('invalid', () => {
        expect(() => verify('blah')).toThrow();
        expect(() => verify(123)).toThrow();
    });
});

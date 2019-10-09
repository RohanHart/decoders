// @flow strict

import { annotate } from 'debrief';
import { guard } from './guard';
import { map } from './utils';
import { Ok, Err } from 'lemons/Result';
import { tuple2 } from './tuple';

import type { Guard, Decoder } from './types';

// $FlowFixMe - deliberate use of any
type cast = any;

type Callable = (...Array<mixed>) => mixed;

const callable: Decoder<Callable> = (blob: mixed) => {
    return typeof blob === 'function' ? Ok(((blob: cast): Callable)) : Err(annotate(blob, 'Must be callable'));
};

function verifyOutput<T>(decoder: Decoder<T>, rawFn: Callable): () => T {
    const verify = guard(decoder);
    return () => {
        const raw = rawFn();
        return verify(raw);
    };
}

export function func0<O>(outputDecoder: Decoder<O>): Decoder<() => O> {
    return map(callable, (rawFn: Callable) => {
        const safeFn = verifyOutput(outputDecoder, rawFn);
        return () => safeFn();
    });
}

export function func1<T1, O>(i1: Decoder<T1>, o: Decoder<O>): Decoder<(T1) => O> {
    return map(callable, (rawFn: Callable) => {
        const safeFn = verifyOutput(o, rawFn);
        return () => safeFn();
    });
}

export function func2<T1, T2, O>(i1: Decoder<T1>, i2: Decoder<T2>, o: Decoder<O>): Decoder<(T1, T2) => O> {
    return map(callable, (rawFn: Callable) => {
        const verifyArgs: Guard<[T1, T2]> = guard(tuple2(i1, i2));
        const verifyOutput: Guard<O> = guard(o);
        return function() {
            // const fnName = rawFn.name || '?';
            const args = verifyArgs(Array.from(arguments));
            const raw = rawFn(...args);
            return verifyOutput(raw);
        };
    });
}

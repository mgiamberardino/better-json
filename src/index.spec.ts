import BetterJSON from '.';
import * as expect from 'expect.js';

describe('BetterJSON', () => {
    describe('Circular Objects', () => {
        it('should be able to stringify from a simple circular object', () => {
            const circular:any = {};
            circular.field = circular;
            const parsed = BetterJSON.parse(BetterJSON.stringify(circular));
            expect(parsed.field === parsed).to.be.ok();
        });
        it('should be able to stringify from a circular object containing arrays', () => {
            const circular:any = {};
            circular.arr = [circular, 'test'];
            circular.arr[2] = circular.arr[0];
            circular.arr[3] = circular.arr[1];
            circular.field = circular;
            const parsed = BetterJSON.parse(BetterJSON.stringify(circular));
            expect(parsed.field === parsed).to.be.ok();
            expect(parsed.arr[0] === parsed).to.be.ok();
            expect(parsed.arr[1] === 'test').to.be.ok();
            expect(parsed.arr[2] === parsed).to.be.ok();
            expect(parsed.arr[3] === 'test').to.be.ok();
        });
        it('should be able to stringify from a circular object containing nested arrays and objects', () => {
            const circular:any[] = [{}];
            circular[1] = {
                arr: [ 
                    circular[0],
                    'test',
                    ],    
            };
            circular[1].arr[2] = {
                arr: circular[1].arr,
            };
            let parsed = BetterJSON.parse(BetterJSON.stringify(circular));
            expect(parsed[0]).to.be.an('object');
            expect(parsed[1]).to.be.an('object');
            expect(parsed[1].arr).to.be.an('array');
            expect(parsed[1].arr[0] === parsed[0]).to.be.ok();
            expect(parsed[1].arr[1]).to.be.eql('test');
            expect(parsed[1].arr[2]).to.be.an('object');
            expect(parsed[1].arr[2].arr === parsed[1].arr).to.be.ok();
        });
    });
    describe('Excersice items test', () => {
        it('should fulfill item 1 example', () => {
            const x = [];
            x[0] = x;
            let parsed = BetterJSON.parse(BetterJSON.stringify(x));
            expect(parsed[0] === parsed).to.be.ok();
        });
        it('should fulfill item 2 example', () => {
            const y = [[]];
            y[1] = y[0];
            const parsed = BetterJSON.parse(BetterJSON.stringify(y));
            expect(parsed[0] === parsed[1]).to.be.ok();
        });
    });
})
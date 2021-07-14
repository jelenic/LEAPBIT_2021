console.log(Math.round(0.145 * 100) / 100);

const num = 0.145;
const a = Math.round(num * 100) / 100;
const b = a.toString().length;
const c = 17 - b - 2;
// float in js is 17 digits

if (num <= 0)
{
    console.log(Math.round(num * 100 - 0.1 ** c) / 100);
}
else
{
    console.log(Math.round(num * 100 + 0.1 ** c) / 100);
}

console.log(Math.round(0.55 * 10) / 10);

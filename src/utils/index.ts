export function generateRandomString(length: number): string {
  let result: string = '';
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export function getRandomNumberInRange(min: number, max: number): number {
  const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min; // 生成介于 min 和 max 之间的随机整数
  return randomNumber > max ? max : randomNumber < min ? min : randomNumber; // 确保最终结果是介于 min 和 max 之间的整数
}

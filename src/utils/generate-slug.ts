/**
 * Генерирует URL-дружественный slug, сохраняя исходную локализацию (кириллицу/латиницу)
 * @param input Входная строка
 * @param separator Разделитель (по умолчанию '-')
 * @returns URL-дружественный slug
 */
export function generateSlug(input: string, separator: string = '-'): string {
  if (!input) return '';

  // Основные преобразования
  return input
    .toString()
    .toLowerCase() // Переводим в нижний регистр
    .normalize('NFD') // Разбиваем символы с диакритиками на базовые символы + диакритики
    .replace(/[\u0300-\u036f]/g, '') // Удаляем диакритические знаки (акценты для латинских символов)
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Удаляем все кроме букв, цифр, пробелов и дефисов (поддержка Unicode)
    .trim() // Обрезаем пробелы по краям
    .replace(/\s+/g, separator) // Заменяем пробелы на разделитель
    .replace(new RegExp(`${separator}{2,}`, 'g'), separator) // Удаляем повторяющиеся разделители
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), ''); // Удаляем разделители с начала и конца
}

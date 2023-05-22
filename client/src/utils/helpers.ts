export function sanitizeHTML(input: string): string {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || '';
}

export function highlightText(text: string, highlight: string): string {
    const regex = new RegExp(highlight, 'gi');
    return text.replace(regex, (match) => `<span class="bg-gray-500">${match}</span>`);
}

export function formatYear(year: string): string {
    return year ? `(${year})` : '';
}

export function truncateText(text: string, length: number): string {
    return text.length > length ? text.substring(0, length) + '...' : text;
}
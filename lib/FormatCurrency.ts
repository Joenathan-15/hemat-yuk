export async function FormatCurrency(value: string) {
    const Numbervalue = +value;
    return 'Rp ' + Numbervalue.toLocaleString('id-ID', { minimumFractionDigits: 0 });
}

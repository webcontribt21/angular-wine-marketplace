export function priceRangeFilterDescriptionHelper(from: number, to: number, min: number, max: number) {
    if (from <= min && to >= max) {
        return 'All';
    } else if (from > min && to < max) {
        return 'R' + from.toString() +  ' - ' + 'R' + to.toString();
    } else if (from > min) {
        return 'R' + from.toString() + '+';
    } else if (to < max) {
        return 'Under R' + to.toString();
    }
    return '';
}

export function ratingRangeFilterDescriptionHelper(from: number, to: number, min: number, max: number) {
    if (from <= min && to >= max) {
        return 'All';
    } else if (from > min && to < max) {
        return from.toString() +  ' - ' + to.toString();
    } else if (from > min) {
        if (from === max) {
            return from.toString();
        }
        return from.toString() + '+';
    } else if (to < max) {
        return 'Up to ' + to.toString();
    }
    return '';
}

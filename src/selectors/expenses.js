import moment from 'moment';

//get visible data
export default (expenses, {text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment,'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day') : true;
        const reg = new RegExp('^'+text.toLowerCase()+'|\\s'+text.toLowerCase(),'g');
        const textMatch = expense.description.toLowerCase().match(reg);
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else {
            return a.amount < b.amount ? 1 : -1
        }
    })
}
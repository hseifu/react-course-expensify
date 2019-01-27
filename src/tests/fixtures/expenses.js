import moment from 'moment';

export default [
    {
        id: '1',
        description: "one",
        note: "",
        amount: 195,
        createdAt: 0,
    },
    {
        id: '2',
        description: "Car downpayment",
        note: "",
        amount: 1950000,
        createdAt: moment(0).subtract(4, "days").valueOf(),
    },
    {
        id: '3',
        description: "credit card",
        note: "",
        amount: 45000,
        createdAt: moment(0).add(4, "days").valueOf(),
    }
]

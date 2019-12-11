import Mock from 'mockjs';

const MockUrl = 'http://localhost:5001';

Mock.mock(`${MockUrl}/regions`, {
    "dataSource|10": [{
        region: '@province',
        country: '@county(false)',
        city: '@city(false)'
    }]
});

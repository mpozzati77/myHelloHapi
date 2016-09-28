'use strict'

const test = require('tap');

test('add - ', function(t) {
    //Arrange
    const options = {
        method: 'GET',
        url: '/asset/add',
        query: {
            name: "aaa"
        }
    }

    //Act
    server.inject(options, function(response) {
        const result = response.result
        code.expect(result).to.equal('Hello World')
        done()
    })
});
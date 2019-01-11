const { expect } = require('code');
const { it, experiment, before, after } = exports.lab = require('lab').script();

const RegisterApp = require('../../index');

const stub = {};

experiment('INTEG API Clients Delete', () => {

  before(async () => {

    stub.server = await RegisterApp();
  });

  [
    ['undefined'],
    ['null', null],
    ['string', 'string'],
    ['empty object', {}],
  ].forEach(([description, id]) => {

    it(`should not allow ${description} ids for clients`, async () => {

      const response = await stub.server.inject({
        method: 'DELETE',
        url: `/api/client/${id}`
      });

      expect(response).to.be.an.object();
      expect(response.statusCode).to.equal(400);
    });
  })
  it('Should not allow deletion of Non-existent Client', async () => {
    const response = await stub.server.inject({
      method: 'DELETE',
      url: '/api/client/4000'
    });

    expect(response).to.be.an.object();
    expect(response.statusCode).to.equal(200);
  })
})
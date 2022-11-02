import { ICustomWorld } from '../support/custom-world'
import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import expect from 'expect'

Then('An affiliate has a valid token', async function (this: ICustomWorld) {
  const { page } = this

  const response = await this?.apiContext?.get(this.config.env.WebshopApi, {})
  expect(response?.status()).toEqual(200)
  console.log(await response?.json())
})

Then(
  'Via the API product {string} has name {string} and price of {string}',
  async function (this: ICustomWorld, product: string, name: string, price: string) {
    const { page } = this

    const response = await this?.apiContext?.get(
      this.config.env.WebshopApi + '/products/' + product,
      {},
    )
    expect(response?.status()).toEqual(200)
    const responseJson = await response?.json()
    expect(responseJson.product.name).toContain(name)
    expect(responseJson.product.price).toContain(price)
  },
)

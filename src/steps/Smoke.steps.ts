import { ICustomWorld } from '../support/custom-world'
import { Given, When, Then, DataTable } from '@cucumber/cucumber'
import expect from 'expect'

When('User opens the webshop', async function (this: ICustomWorld) {
  const { page } = this
  await page?.goto(this.config.env.BASE_URL)
})

Then('User is on the homepage', async function (this: ICustomWorld) {
  const { page } = this
  const title = await page?.title()
  expect(title).toContain('Valori Automation Practice Shop')
})

When('User navigates to the contact page', async function (this: ICustomWorld) {
  const { page } = this
  await page?.click('#contact-link')
  expect(await page?.title()).toContain('Contact us')
})

When(
  'User fills in the contact form with subject {string}, email {string}, file {string} and message {string}',
  async function (
    this: ICustomWorld,
    subject: string,
    email: string,
    filePath: string,
    message: string,
  ) {
    const { page } = this

    if (email == ' ') {
      email = 'dummy@gmail.com'
    }
    if (filePath == ' ') {
      filePath = 'fixtures/uploadfiles/dummy_file.txt'
    }
    if (message == ' ') {
      message = `Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    }

    await page?.selectOption('[name="id_contact"]', { label: subject })
    await page?.fill('[name="from"]', email)
    await page?.setInputFiles('[name="fileUpload"]', filePath)
    await page?.fill('[name="message"]', message)
    await page?.click('[name="submitMessage"]')
  },
)

Then('The correct send success message should be displayed', async function (this: ICustomWorld) {
  const { page } = this
  expect(await page?.innerText('[class*="alert-success"]')).toContain(
    'Your message has been successfully sent to our team.',
  )
})

When(
  'I open the details for product {string}',
  async function (this: ICustomWorld, product: string) {
    const { page } = this
    await page?.click('a:has-text("' + product + '")')
  },
)

Then(
  'The product has the following description {string} and price {string}',
  async function (this: ICustomWorld, description: string, price: string) {
    const { page } = this
    expect(await page?.innerText('[itemprop="price"]')).toContain(price)
    expect(await page?.innerText('[class="product-description"] >> nth=1')).toContain(description)
  },
)

When(
  'I add the following product to my shopping cart',
  async function (this: ICustomWorld, myTable: DataTable) {
    const { page } = this

    for await (const product of myTable.rows()) {
      await page?.click('a:has-text("' + product.toString() + '")')

      // Use intercept to monitor communication which is happening in the background like Ajax call
      const respPromise = page?.waitForResponse((resp) =>
        resp.url().includes('module/ps_shoppingcart/ajax'),
      )

      await page?.click('button:has-text("Add to cart")')

      const response = await respPromise
      console.log(response?.status()) // Log status of the response
      // console.log(await response?.json()) // Log body of the response

      await page?.click('button:has-text("Continue shopping")')
      await page?.click('span:has-text("Home") >> nth=0')
    }
  },
)

Then('I open the shopping cart', async function (this: ICustomWorld) {
  const { page } = this
  await page?.click('span:has-text("Cart")')
  await page?.isVisible('h1:has-text("Shopping Cart")')
})

Then(
  'The shopping cart contains {string} products with a total of {string}',
  async function (this: ICustomWorld, numerOfProducts: string, total: string) {
    const { page } = this
    expect(await page?.$$('[class="cart-item"]')).toHaveLength(parseInt(numerOfProducts))
    expect(
      await page?.innerText('[class="cart-summary-line cart-total"] >> [class="value"]'),
    ).toContain(total)
  },
)

import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber'
import * as messages from '@cucumber/messages'
import { BrowserContext, Page, APIRequestContext } from 'playwright'
import { readJsonSync } from 'fs-extra'

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string }
}

export interface ICustomWorld extends World {
  debug: boolean
  feature?: messages.Pickle
  context?: BrowserContext
  page?: Page

  testName?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
  apiContext?: APIRequestContext
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options)
  }
  debug = false

  config = readJsonSync('./project.json', { throws: false })
}

setWorldConstructor(CustomWorld)

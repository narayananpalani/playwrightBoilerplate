/* eslint-disable @typescript-eslint/no-explicit-any */
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { expect} from "@playwright/test"
import login from '../pages/login.page'
import name from '../pages/name.page '
import customer from '../pages/customer.page '
import bankmanager from '../pages/bankmanager.page'
import base from '../actions/base.action'
import { config } from '../../config/test.config'
import user from '../fixtures/test_data.json'
import AxeBuilder from '@axe-core/playwright';
const basePage = new base(global.page)

//    Given user navigate to login page
//When user create a customer
//Then customer added successfully

When('user create a customer', async function () {
  await basePage.clickOnElement(login.bankmgrButtonSelector);
  console.log('user successfully navigated to bank manager login');
  await basePage.clickOnElement(bankmanager.addCustomerButtonSelector)
  await basePage.typeInTextField(bankmanager.firstNameTextBoxSelector, 'Alan');
  await basePage.typeInTextField(bankmanager.lastNameTextBoxSelector, 'Davidson');
  await basePage.typeInTextField(bankmanager.postCodeTextBoxSelector, 'E6 2JL');
  await basePage.clickOnElement(bankmanager.createCustomerSubmitButtonSelector);
})

When('customer added successfully', async function () {
  global.page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert')
    expect(dialog.message()).toContain('Customer added successfully with customer id :')
  }
  )
  await basePage.clickOnElement(bankmanager.customersButtonSelector);
  await basePage.typeInTextField(bankmanager.searchCustomerTextBoxSelector, 'Alan');
  await expect(global.page.locator(bankmanager.customerFirstNameSearchResultSelector)).toHaveText('Alan');

})

When('user duplicate a customer in create customer section', async function () {
  await basePage.clickOnElement(login.bankmgrButtonSelector);
  console.log('user successfully navigated to bank manager login');
  await basePage.clickOnElement(bankmanager.addCustomerButtonSelector)
  await basePage.typeInTextField(bankmanager.firstNameTextBoxSelector, 'Alan');
  await basePage.typeInTextField(bankmanager.lastNameTextBoxSelector, 'Sime');
  await basePage.typeInTextField(bankmanager.postCodeTextBoxSelector, 'E6 2JL');
  await basePage.clickOnElement(bankmanager.createCustomerSubmitButtonSelector);
//re-enter the same customer as duplication
  await basePage.clickOnElement(bankmanager.addCustomerButtonSelector)
  await basePage.typeInTextField(bankmanager.firstNameTextBoxSelector, 'Alan');
  await basePage.typeInTextField(bankmanager.lastNameTextBoxSelector, 'Sime');
  await basePage.typeInTextField(bankmanager.postCodeTextBoxSelector, 'E6 2JL');
  await basePage.clickOnElement(bankmanager.createCustomerSubmitButtonSelector);
})

When('error message display during duplicate customer creation', async function () {
  global.page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert')
    expect(dialog.message()).toContain('Please check the details. Customer may be duplicate.')
  }
  )
})

When('visual comparison check user interface changes successfully', async function () {
  await global.page.screenshot({ 
    path: './test-results/snapshots/createCustomer.png',
     }
    );
  expect(global.page.screenshot()).toMatchSnapshot();
   }
  )


  When('accessibility check of user interface successfully', async function ({page}) {
  
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);   
  
  }
    )
  





import { test, expect, type Page } from '@playwright/test';
test('auth and order', async ({ page, baseURL }) => {
    await page.route('https://fakestoreapi.com/products', async route => {
        const json = [
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                "rating": {
                    "rate": 3.9,
                    "count": 120
                }
            },
            {
                "id": 2,
                "title": "Mens Casual Premium Slim Fit T-Shirts ",
                "price": 22.3,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                "rating": {
                    "rate": 4.1,
                    "count": 259
                }
            },
            {
                "id": 3,
                "title": "Mens Cotton Jacket",
                "price": 55.99,
                "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                "rating": {
                    "rate": 4.7,
                    "count": 500
                }
            }
        ];
        await route.fulfill({ json });
    });

    await page.route('https://httpbin.org/post', route => route.fulfill({
        status: 200,
        body: 'accept',
    }));

    // await page.route('https://httpbin.org/post', async route => {
    //     const json = {message: 'форма отправлена'};
    //     await route.fulfill({ json });
    // });

    // await page.route('*/products', request => {
    //     return request.request().url()
    //         .startsWith('https://fakestoreapi.com/products') ? request.abort() :
    //         request.continue()
    // });

    await page.goto('/')
    await page.content();

    expect(curentRoute()).toBe('/login')
    await expect(page.locator('.header h1')).toContainText('Login')

    await page.locator('input[name="email"]').fill('test@test.do')
    await page.locator('input[name="password"]').fill('qwerty123')
    await page.getByRole('button', { name: 'Подтвердить' }).click()

    await page.content()

    expect(curentRoute()).toBe('/')
    await expect(page.locator('#products .header h1')).toContainText('products')

    await page.locator('input[name="fio"]').fill('Иванов Иван Иванович')
    await page.locator('input[name="dob"]').fill('1990-01-01')
    await page.locator('input[name="phone"]').fill('+79999999')
    await page.locator('input[name="email"]').fill('test@test.do')
    await page.getByRole('checkbox').check()

    await page.getByTestId('product-item-1').getByRole('button').click()
    await page.getByTestId('product-item-2').getByRole('button').dblclick()
    await page.getByTestId('product-item-3').getByRole('button').click()

    await expect(page.locator('.sum-price').nth(0)).toContainText('210.54$')

    // page.on('response', response => console.log('<<', response.status(), response.url()));
    await page.getByRole('button', { name: 'Отправить' }).click()
    const responseSendForm = await page.waitForResponse(response => response.url().includes('https://httpbin.org/post') && response.status() === 200);
    // const responseSendFormData = JSON.parse(await responseSendForm.body())

    expect(responseSendForm.status()).toBe(200)
    expect(await responseSendForm.text()).toBe('accept')

    // expect(responseSendFormData.message).toBe('форма отправлена')

    function curentRoute() {
        return page.url().replace(baseURL, '')
    }
})


# Modül Projesi: Context API - Alışveriş Sepeti

Bu modülde, 'Context API' hakkında yeni edindiğiniz bilgileri kullanarak bir e-ticaret sayfasını 'Context API' kullanacak şekilde yeniden düzenleyecek ve uygulamanın işlevselliğini genişleterek onu daha sağlam hale getireceksiniz!

## Giriş

Bu talimatları dikkatlice okuyun. Bu projeye başlamadan önce tam olarak ne beklendiğini anlayın.

### Talimatlar

### Görev 1: Proje Kurulumu

- [+] Forklayın.
- [+] Klonlayın
- [+] Ana dizine gidin
- [+] `npm install`
- [+] `npm start`

### Görev 2: Gereksinimler

Başlamadan önce, lütfen birkaç dakikanızı ayırın ve bu uygulamayı keşfedin. Neler olduğunu ve nasıl çalıştığını anlayın.

- "App.js"ye bakarsanız, şu anda iki state özelliği olduğunu fark edeceksiniz - mevcut tüm ürünleri takip etmek için "products" ve tüm sepetteki ürünleri tutacak bir "cart" statei.

- Ayrıca `App.js` dosyamızın içinde 3 bileşene sahip olduğumuzu fark edeceksiniz. Bir navigasyon bileşeni ve iki route tabanlı bileşen. Bu bileşenlerin her biri, ya "cart" stateinden ya da "product" stateini prop olarak alıyor, uygulamamızı ölçeklendirmeye başladığımızda ve daha fazla özellik eklediğimizde, kod tabanımız çok hantal olmaya başlayacak ve uygulamamızın çalışmasını zorlaştıracak.

- Bunun olmasını önlemek için, uygulamamızı "Context API'sı" kullanacak şekilde yeniden düzenleyeceğiz ve uygulamamız genelinde verilere erişimi daha kolay ve verimli hale getireceğiz.

**Adım 1 - Öğe işlevi ekle**

- "App.js" içinde "addItem" adlı bir işlev vardır. Verilen ürünü alışveriş sepetine ekleyebilmek için bu fonksiyonu kullanın.

**ADIM 2 - ProductContext Oluşturma**

- `src` içinde, `contexts` adında yeni bir klasör oluşturun, bu klasör, oluşturduğumuz tüm `context nesne`leri tutmak için kullanılacaktır.

- Bu klasörün içinde "ProductContext.js" adlı yeni bir dosya oluşturun.

- Bu dosyada, react kitaplığından "createContext" işlevini import edin ve "ProductContext"imizi oluşturun.

**ADIM 3 - ProductContext ile veri sağlama**

- Artık "ProductContext"imizi oluşturduğumuza göre, "App.js" dosyamıza import edebiliriz. Artık uygulamamızın geneline veri sağlamaya başlayabiliriz!

- Tüm components/routes ları `App.js` den `ProductContext.Provider` bileşenine tanımlayın.

- Ardından, "Provider" a bir değer propu iletin.

- Değer prop'unda, ürünler stateini ve sepete kitaplar ekleyebilmemizi sağlayacak bir addItem işlevini geçeceğiz.

```js
<ProductContext.Provider value={{ products, addItem }}>
```

- Artık ürünlerimizin stateini ve addItem işlevini sağladığımıza göre, ürünlerimizin routeunu biraz basitleştirebiliriz.

**Öncesi**

```js
<Route exact path="/">
  <Products products={products} addItem={addItem} />
</Route>
```

**Sonrası**

```js
<Route exact path="/">
  <Products />
</Route>
```

- Düzenlemeden sonra birkaç hata fark edeceksiniz... Bunları kısa süre içinde düzelteceğiz merak etmeyin!

**ADIM 4 - ProductContext ile veri kullanma**

- Artık `ProductContext` ile veri sağladığımıza göre, sonunda onu kullanabiliriz! Bunu yapmak için "Products" bileşenimize gidelim ve "useContext" hookunu ve "ProductContext"imizi içe aktaralım (import).

- Bileşende, "useContext" hookunu çağırın ve içine kullanmak istediğimiz context nesnesini iletin.

- Bunu yaptığımızda `useContext`, `ProductContext` Provider `value` prop undan gönderilen değeri döndürecek. Bu durumda, iki propu olan bir nesneyi geri alıyoruz. Bir `products` propu ve bir `addItem` propu. Devam edip bunları yok edebiliriz.

```js
const { products, addItem } = useContext(ProductContext);
```

- Artık ihtiyacımız olan tüm verilere sahip olduğumuza göre, "Products" bileşenimizi proplar kullanarak yeniden düzenleyebiliriz.

- Bunu yapmak için her "props" örneğini kaldırmamız yeterlidir..

  - Fonksiyon parametrelerinden kaldırın
  - Ürün haritasından kaldırın
  - addItem prop'undan kaldırın

- Şimdi `Products` bileşeni verileri yalnızca `Context API` den alıyor 😃.

**ADIM 5 - CartContext oluşturun**

- Artık "Products" bileşenimizi "Context API" kullanacak şekilde yeniden düzenlediğimize göre, "Carts" ve "Navigation" Bileşenlerimizi de "Context API" kullanacak şekilde yeniden düzenleyelim.

- Context klasörümüzde "CartContext.js" adlı yeni bir dosya oluşturun, bu context "ShoppingCart" ve "Navigation" bileşenimiz tarafından kullanılacaktır.

- Yeni "CartContext" dosyamızın içinde "createContext"i içe aktarın ve "CartContext" adlı yeni bir içerik oluşturun.

**ADIM 6 - CartContext ile veri sağlama**

- Devam edelim ve yeni oluşturduğumuz "CartContext"i "App.js" dosyamıza getirelim ve tüm bileşenlerimizi "CartContext.Provider" içine aktaralım.`ProductContext.Provider` ürünümüzün hala kök sağlayıcı olduğundan emin olun.

- Şimdi "CartContext.Provider" dosyamıza bir değer prop'u iletin, bu değer prop "cart" durumumuzu içerecektir.

- Artık sepet verilerimizi sağladığımıza göre, "Navigation" ve "ShoppingCart" bileşenlerimizi yeniden düzenlemeye başlayabiliriz.

- Önce `ShoppingCart` bileşenimizle başlayalım. Devam edin ve "ShoppingCart" routeunu, render statelerini kullanmaya gerek kalmayacak şekilde yeniden düzenleyin. Bu bize bir hata verecektir, ancak bunu hızlı bir şekilde çözeceğiz.

- Bu sırada devam edelim ve propları navigasyonumuzdan da kaldıralım.

**ADIM 7 - Son adım**

- Sepet verilerimiz artık 'CartContext' tarafından sağlanıyor!

- Öncelikle, `ShoppingCart` bileşenimize gidelim ve `useContext` hookunu ve `CartContext`imizi içe aktaralım.

- Şimdi bileşende, "CartContext"i "useContext" hookuna iletin ve sepet adlı bir değişkene atayın.

- Bileşenimizin içinde şimdi tüm prop örneklerini kaldırmamız gerekiyor.

  - "props" parametresini kaldırın
  - "getCartTotal" işlevimizdeki "props" kısmını kaldırın
  - Sepetimiz üzerinde eşleme yaparken "propları" kaldırın

- Aynı şeyi "Navigation" bileşenimiz için yapma zamanı.
  - Önce "useContext" hookunu ve "CartContext" dosyamızı içe aktarın
  - Ardından, 'CartContext'imizi 'useContext' hookuna iletin ve sepet adlı bir değişkene atayın.
  - Son olarak, tüm "props" örneklerini kaldırmamız gerekiyor.
  - "props" parametresini kaldırın
  - Sepet lenghtinden "propları" kaldırın

Artık uygulamamızı başarılı bir şekilde "Context API" kullanımına dönüştürdük. 🔥

### Görev 3: Esnek Problemler

MVP'ye ulaşılana kadar esnek problemlere başlamayın.

- Bir butona tıklayınca sepetinizden bir öğeyi kaldırmanıza izin veren bir 'removeItem' işlevi oluşturun. Bu "removeItem" işlevi, "ShoppingCartItem" bileşeninizden kullanılabilir olmalıdır.
  Her öğenin bir 'id'si olduğunu unutmayın, bu, removeItem işlevinizi oluştururken çok yardımcı olacaktır!

- `localStorage` Kullanarak Sepet Öğelerini Sürdürülebilir hale getirin. (Bunu denerseniz, ürünlerimizin alışveriş sepetini yenileyerek doldurmasını sağlamak biraz zor olacaktır. Verilerin gerçekte nerede depolandığını ve uygulama bir yenilemeden sonra yeniden yüklenirken localStorage'dan oraya nasıl veri alabileceğinizi düşünmeniz gerekecek. İyi şanslar!)

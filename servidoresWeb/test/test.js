fetch('http://localhost:8080/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: 'product8', description: 'product8', price: 80, thumbnail: 'product8', code: '88', stock: '808'})   
})
## Esercizio

Usando l'array dei post fornito con le relative immagini, creare un file di routing (`routers/posts.js`) che conterrà le rotte necessarie per l'entità post.

1. `/` - **index**: Ritornerà un HTML con una `ul` che stamperà la lista dei post.
2. `/:slug` - **show**: Tramite il parametro dinamico che rappresenta lo slug del post, ritornerà un JSON con i dati del post.
3. `/create` - **create**: Ritornerà un semplice HTML con un `h1` con scritto "Creazione nuovo post". Nel caso venga richiesta una risposta diversa da HTML, lancerà un errore 406.
4 `/:slug/download` - **download**: Dovrà far scaricare l’immagine del post rappresentato dallo slug. Attenzione, se lo slug contiene il simbolo `/`, la rotta non funzionerà. C’è qualche strumento che ci permette di codificare lo slug?
5. Scrivere tutte le funzioni delle rotte nel controller dedicato.
6. Registrare il router dentro `app.js` con il prefisso `/posts`.

---

## Bonus

1. Nella rotta **show**, aggiungere al post una proprietà `image_url` dove creare il link completo per l'immagine.
2. Aggiungere un'altra proprietà `image_download_url` che invece dovrà far scaricare l'immagine puntando alla rotta **download**.
3. Rendere navigabili i post nella **index**, stampando un link per la show di ciascuno.
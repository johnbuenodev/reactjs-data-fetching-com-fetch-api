import './App.css';
import { Component } from 'react';

class App extends Component {

  state = {
    posts: [],
  };

  //Para carregar os dados vindos de API serviços
  componentDidMount() {
    //Utilizando fetching api do navegador
    //Usando dados: https://jsonplaceholder.typicode.com/posts
    //Trabalhando com promessas Promises

    /* Uma das formas simplificadas para fazer
    fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(response => this.setState({ posts : response}))
    */

    //Com essa função para consumir os dados da API deixa o metodo de ciclo de vida mais limpo e claro     
    this.loadPosts();

  }

  loadPosts = async () => {

    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos');
    
    //trabalhar com varias promessas
    const [posts, photos] = await Promise.all([postResponse,photoResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      //... significa que vai passar toda a informação e no caso de classes com suas respectivas heranças exemplo
      //Vai ser add no return um novo conjunto de dados que será o post, nele restorna todo o post e segundo valor dentro da cadeira do json o cover que será o atributo url do objeto photo
      return {...post, cover: photosJson[index].url}
    });

    //postResponse anteriormente
    this.setState({ posts: postsAndPhotos });

  }

  render() {

    const { posts } = this.state;

    return (
      <section className="container">
        <div className="posts">
          {posts.map(post => (
            <div key={post.id} className="post">
              <img className="post-img" src={post.cover} alt={post.title}/>
              <div className="post-content">
                {/* <p>{post.id}</p> */}
                <h1 className="title-strong">{post.title}</h1>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;

/*
   <div className="App">
     
     <div className="container-card">
       {posts.map(post => (
         <div key={post.id} className="card-item">
           <h1>{post.id}</h1>
           <h4>{post.title}</h4>
           <p>{post.body}</p>
         </div>

       ))}
     </div>
   </div> */
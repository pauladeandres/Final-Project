// import { Component } from 'react'
// import CategoryService from './../../../service/category.service'

// import { Row } from 'react-bootstrap'

// import sofas from './Sofas.webp'

// import { Glide, GlideProps } from 'react-glide';

// const props:

// GlideProps = {
//     height: 300,
//     width: 600,
//     autoPlay: true,
//     autoPlaySpeed: 5000,
//     onSlideChange: () => console.log('slide changed'),
//     infinite: false,
//     dots: true
// }


// class CategoriesList extends Component {

//     constructor() {
//         super()
//         this.state = {
//             categoryOptions: undefined
//         }
//         this.categoriesService = new CategoryService()
//     }

//     loadCategories() {

//         this.categoriesService
//             .getAllCategories()
//             .then(response => {
//                 console.log(response)
//                 this.setState({ categoryOptions: response.data })
//             })
//             .catch(err => console.log('TENEMOS UN PROBLEMA', err))
//     }

//     componentDidMount() {
//         this.loadCategories()
//     }

//     render() {


//         return (
//             <Glide {...props}>

//                     <img src={sofas} />
//                     <img src={sofas} />
//                     <img src={sofas} />

//             </Glide>


//         )
//     }
// }

// export default CategoriesList
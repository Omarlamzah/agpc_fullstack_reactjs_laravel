import React from 'react'
import Header from '../../components/Header/Header'
import Event from '../../components/Event/Event'
import About from '../association/About'
import Bureau from '../association/BUREAU/Bureau'
import Vidiotique from '../viddiotique/Vidiotique'
import Agenda from '../Agenda/Agenda'
import Contact from '../Contact/Contact'
import Partenaire from '../Partenaire/partenaire'
import Speackers from '../../components/Speackers/Speackers'
import GoToTopButton from '../../components/Gototop'
 import ScrollProgress from '../../components/ScrollProgress'
  
export default function Home() {
  return (
    <div  className='-mt-20 md:mt-[-90px] '>
      <Header/>
      <div className=' md:mt-[250px]'> <About/></div> 
      <Vidiotique/>
       <Speackers/>
    

     

         {/* 
           <Event/>
         <Speackers/>
        <Bureau/> 
       <Agenda/>
       <Contact/>
       <Partenaire/>
*/}
       
        <ScrollProgress/>
       <GoToTopButton/>



    
    </div>
  )
}

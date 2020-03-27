import React, { Component } from 'react';
import TestFaqBox from '../../components/TestFaqBox/testFaqBox';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/navigation';
import classes from './testimonial.module.css'


export class testimonial extends Component {

    state = {
        testimonials: [
            {
                name: 'Göktürk',
                comment: `Merhabalar dün itibariyle 21 gün sonuna geldim. Kendimi daha
                pozitif ve olumlu hissediyorum. Çok çok teşekkür ederim iyi ki karşıma
                çıktınız.`,
                gender: 'f'
            },
            {
                name: 'Kedi',
                comment: `Merhabalar size teşekkür etmeliyim. Sayeniz de çok açıldım ve motivasyonum
                yükseldi ve daha niceleri.`,
                gender: 'f'
            },
            {
                name: 'Ece',
                comment: `Olumlamalar beynime sonsuz bir güvenle işledi. Sizi seviyorum ve hayatıma kattığınız
                tüm pozitif düşünceler için çok teşekkür ediyorum.`,
                gender: 'f'
            },
            {
                name: 'Nil',
                comment: `Yaklaşık 3.5 aydır uyku düzeni kuramıyordum ve hayata sürekli
                negatif bakiyordum, zaten olmaz diyordum, sonra size denk geldim çok şükür.
                Elinize, emeğinize ve bilginize sağlık.`,
                gender: 'f'
            },
            {
                name: 'Yağmur',
                comment: `Size gerçekten teşekkür ederim. Sizi keşfettiğim günden beri
                daha sakinim. Daha sakin daha huzurluyum. Eskisi gibi herseyi dert etmiyor ve
                öfkelenmiyorum.`,
                gender: 'f'
            },
        ]
    }

    render() {


        let testimonials = this.state.testimonials.map((test, idx) => {
            return (
                <TestFaqBox 
                    name = {test.name}
                    desc = {test.comment}
                    gender= {test.gender}
                    key = {idx}
                />
            )
        })

        return (
            <React.Fragment>
                <Navigation bgColor='#2C2C2C'>
                <Link style={{ textDecoration: 'none' }} to={'/'}><p className={classes.LinkButton}>BASLA</p></Link>
                </Navigation>
                <h2 style={{marginTop: '5vh'}}>Sizden Gelenler</h2>
                <div className={classes.TestimoniailContainer}>
                    {testimonials}
                </div>
            </React.Fragment>
        )
    }
}

export default testimonial

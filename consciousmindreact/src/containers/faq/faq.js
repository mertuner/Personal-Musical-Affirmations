import React, { Component } from 'react';
import TestFaqBox from '../../components/TestFaqBox/testFaqBox';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation/navigation';
import classes from './faq.module.css';


export class faq extends Component {
    state = {
        faqs: [
            {
                name: `Olumlama cümlelerini neden duyamiyorum?`,
                comment: `Çünkü olumlamalar 2. ses olarak kaydın içine eklenmiştir, bilinciniz
                algılamasa da bilinçaltınıza bu olumlamalar direktif
                olarak gider.(Subliminal)`,
            },
            {
                name: `Neden 21 gün, bir gün dinlemedim baştan mı dinlemeleyim?`,
                comment: `21 gün  araştırmalara göre alışkanlık verilen ortalama
                süreçtir. Bazı durumlarda etki
                için daha uzun sürelere ihtiyaç duyulur, bu kişisel bir durumdur, bu
                araştırmalar deneysel ögelere göre yapılır. Ancak önemli olan süreklilikdir,
                evet bir gün kaçırırsaniz bastan dinlemeniz gerekir.`,
            },
            {
                name: `Kulaklıkla mı dinlemeliyim?`,
                comment: `Belirli miktarlarda desibellerde oynama yaptığımızdan,
                sesini çok kısmamanızı öneririm.Kulaklık kullanmak zaruri olmamakla birlikte,
                sesi duyabildiğinizden emin olunuz.`,
            },
            {
                name: `Olumlamaları dinlerken fısıltı duyuyorum, bu normal mi?`,
                comment: `Evet normal, farklı üniversitelerde yapilan farklı
                araştırmalarda, farklı desibel ölçüleri bulunmuş subliminal kayıtlar
                için, bunları kullandıgımızda, desibeli düşük bazı melodilerde
                alt sesi duyabiliyorsunuz.`,
            },
            {
                name: `Subliminal kayıt nasıl oluyor?`,
                comment: `Kayıtta sizin duydugunuz müziğin kaydı ile, kayıt
                edilen olumlama kalıplarının kaydı birleştiriliyor. Olumlama kaydının
                desibel ve frekans ayarları sizin kulağınızın duyamayacağı fakat özel olarak
                bilinçaltınızın algılayacaği seviyelerde kaydediliyor`,
            },
        ]
    }

    render() {


        let faqs = this.state.faqs.map((faq, idx) => {
            return (
                <TestFaqBox 
                    name = {faq.name}
                    desc = {faq.comment}
                    ques
                    key = {idx}
                />
            )
        })

        return (
            <React.Fragment>
                <Navigation bgColor='#2C2C2C'>
                <Link style={{ textDecoration: 'none' }} to={'/'}><p className={classes.LinkButton}>BASLA</p></Link>
                </Navigation>
                <h2 style={{marginTop: '5vh'}}>Sıkça Sorulan Sorular</h2>
                <div className={classes.FaqContainer}>
                    {faqs}
                </div>
            </React.Fragment>
        )
    }
}

export default faq

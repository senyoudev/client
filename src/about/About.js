import './about.css'

const About = () => {

    return (
        <div className="about">
            <h1 className="about__title">
                About Us
            </h1>
            <div className="about__card">
                <div className="about__card__img">
                    <img src="https://picsum.photos/200/300" alt="" />
                </div>
                <div className="about__card__content">
                    <div className="content__heading">
                        <h3>What Is IEEE ?</h3>
                    </div>
                    <div className="content__body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse laudantium exercitationem reiciendis quibusdam nemo? Quibusdam optio blanditiis voluptate nulla iste pariatur atque corporis, sequi deserunt sint, porro reiciendis tempore. Soluta maiores corporis qui nemo fuga. Recusandae perferendis debitis commodi necessitatibus ad blanditiis id? Quas ratione molestias aut sequi numquam iure similique consectetur! Sint voluptatibus, ipsum ex ad quod omnis earum odio nostrum dolorem, explicabo quis delectus consequatur? Aliquam accusantium commodi neque deserunt aut earum voluptate, repudiandae illum sapiente quae tempore.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum laudantium quaerat ullam repellat unde illum dignissimos perspiciatis officia eligendi?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eligendi tempore explicabo beatae odit tempora a? Nisi architecto saepe eum non. Facere consequatur delectus quaerat dignissimos, unde iure nisi placeat, quod eos, minus quibusdam repudiandae fugiat fugit explicabo ducimus nihil?
                    </div>
                    <div className="content__tail">
                        <button>
                            Learn more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
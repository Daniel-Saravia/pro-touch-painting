import styles from './Testimonials.module.css'

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Our HOA chose Pro Touch Painting, and we are extremely happy they did. Our house was finished today, and we are so impressed! Over 20 units in our HOA are finished at this point, and they are all looking great. The neighbors we have talked to are very pleased. Jorge and the crew are true pros - very efficient. Prep work was thorough. Communication was excellent, and we smiled whenever one of the crew would sing a tune. ¡Su experiencia se nota y se merecen cada una de las cinco estrellas!",
    author: "James B R",
    role: "HOA Member"
  },
  {
    id: 2,
    rating: 5,
    text: "AMAZING TEAM!!! It's a family ran business and I've used them for YEARS! They do all my new homes and I would not use another painter. Jorge is great! Responsiveness, Punctuality, Quality, Professionalism, Value - they excel at everything!",
    author: "Jorge Ruiz",
    role: "Home Builder"
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Real reviews from satisfied customers</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className={styles.testimonialText}>&quot;{testimonial.text}&quot;</p>
              <div className={styles.testimonialAuthor}>
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
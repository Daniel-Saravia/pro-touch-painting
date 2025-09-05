import styles from './Testimonials.module.css'

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Pro Touch transformed our entire home with their painting services. The attention to detail was incredible, and they finished ahead of schedule. Highly recommend!",
    author: "Sarah Johnson",
    role: "Homeowner"
  },
  {
    id: 2,
    rating: 5,
    text: "Outstanding drywall repair work! They fixed water damage that I thought would require replacing entire walls. You can't even tell there was damage. True professionals!",
    author: "Michael Chen",
    role: "Property Manager"
  },
  {
    id: 3,
    rating: 5,
    text: "The cabinet refinishing saved us thousands! Our kitchen looks brand new. The team was clean, efficient, and the results exceeded our expectations.",
    author: "Emily Rodriguez",
    role: "Homeowner"
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
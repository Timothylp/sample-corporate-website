import { useState } from "react"
import NextImage from "../elements/image"

import styles from "@/styles/components/sections/_TestimonialsGroup.module.scss"

const TestimonialsGroup = ({ data }) => {
  // Only show one testimonial at a time
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0)
  const selectedTestimonial = data.testimonials[selectedTestimonialIndex]

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.text}>{selectedTestimonial.text}</p>
      {/* Change selected testimonial (only if there is more than one) */}
      <div className={styles.authors}>
        {data.testimonials.map((testimonial, index) => (
          <div
            className={
              testimonial === selectedTestimonial
                ? styles["author--selected"]
                : styles.author
            }
            key={testimonial.id}
          >
            <div
              className={styles.img}
              onClick={() => setSelectedTestimonialIndex(index)}
            >
              <NextImage
                width={testimonial.picture.data.attributes.width}
                height={testimonial.picture.data.attributes.height}
                media={testimonial.picture}
              />
            </div>
            {testimonial === selectedTestimonial && (
              <>
                <p className={styles.name}>{selectedTestimonial.authorName}</p>
                <p className={styles.title}>
                  {selectedTestimonial.authorTitle}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsGroup

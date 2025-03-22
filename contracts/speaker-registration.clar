;; Speaker Registration Contract
;; Records details of fluent language users

(define-data-var last-id uint u0)

(define-map speakers
  { id: uint }
  {
    name: (string-ascii 100),
    tribe: (string-ascii 100),
    fluency-level: (string-ascii 20), ;; "native", "fluent", "intermediate", "beginner"
    contact-info: (string-ascii 100),
    bio: (string-ascii 500),
    registered-at: uint,
    active: bool
  }
)

;; Register a speaker
(define-public (register
    (name (string-ascii 100))
    (tribe (string-ascii 100))
    (fluency-level (string-ascii 20))
    (contact-info (string-ascii 100))
    (bio (string-ascii 500))
  )
  (let
    (
      (new-id (+ (var-get last-id) u1))
    )
    (var-set last-id new-id)

    (map-set speakers
      { id: new-id }
      {
        name: name,
        tribe: tribe,
        fluency-level: fluency-level,
        contact-info: contact-info,
        bio: bio,
        registered-at: block-height,
        active: true
      }
    )

    (ok new-id)
  )
)

;; Update speaker status
(define-public (update-status
    (speaker-id uint)
    (active bool)
  )
  (let
    (
      (speaker (unwrap! (map-get? speakers { id: speaker-id }) (err u404)))
    )

    (map-set speakers
      { id: speaker-id }
      (merge speaker { active: active })
    )

    (ok true)
  )
)

;; Update speaker information
(define-public (update-info
    (speaker-id uint)
    (contact-info (string-ascii 100))
    (bio (string-ascii 500))
  )
  (let
    (
      (speaker (unwrap! (map-get? speakers { id: speaker-id }) (err u404)))
    )

    (map-set speakers
      { id: speaker-id }
      (merge speaker {
        contact-info: contact-info,
        bio: bio
      })
    )

    (ok true)
  )
)

;; Get speaker
(define-read-only (get-speaker (id uint))
  (map-get? speakers { id: id })
)

;; Get speaker count
(define-read-only (get-count)
  (var-get last-id)
)


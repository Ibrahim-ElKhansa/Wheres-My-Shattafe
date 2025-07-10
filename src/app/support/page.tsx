"use client";

import "@/styles/support-page.scss";
import Image from "next/image";

export default function Support() {
  return (
    <div className="support-page">
      <h2 className="support-page__title">Support Where&apos;s My Shattafe</h2>

      <section className="support-page__section">
        <h3 className="support-page__section-title">How to Contribute</h3>
        <p className="support-page__text">
          <strong>Where&apos;s My Shattafe</strong> is a community-supported project. Contributing is now easier than ever! Simply sign in to your account and click &quot;Submit Toilet&quot; on the
          map screen to add new toilet locations with bidets. All submissions are reviewed and approved by our volunteer moderators before they appear on the map.
        </p>
      </section>

      <section className="support-page__section">
        <h3 className="support-page__section-title">Contact & Support</h3>
        <p className="support-page__text">If you need help, want to suggest improvements, or report issues, please get in touch:</p>

        <ul className="support-page__contact-list">
          <li className="support-page__contact-item">
            WhatsApp:{" "}
            <a href="https://wa.me/9613299973" className="support-page__link">
              Chat with me
            </a>
          </li>
          <li className="support-page__contact-item">
            Email:{" "}
            <a href="mailto:ibrahimelkhansa02@gmail.com" className="support-page__link">
              ibrahimelkhansa02@gmail.com
            </a>
          </li>
          <li className="support-page__contact-item">
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/ibrahimelkhansa/" target="_blank" rel="noopener noreferrer" className="support-page__link">
              My LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <section className="support-page__section">
        <h3 className="support-page__section-title">Help Make This an App</h3>
        <p className="support-page__text">
          Want to see <strong>Where&apos;s My Shattafe</strong> on your phone? Help me raise <strong>$150</strong> to cover:
        </p>
        <ul className="support-page__funding-list">
          <li className="support-page__funding-item">Domain name registration</li>
          <li className="support-page__funding-item">Apple Developer License ($99/year)</li>
          <li className="support-page__funding-item">Google Play Store License ($25 one-time)</li>
        </ul>

        <p className="support-page__text">You can donate through:</p>

        <div className="support-page__donation-methods">
          <div className="support-page__donation-method">
            <h4 className="support-page__donation-title">Whish</h4>
            <div className="support-page__qr-placeholder">
              <Image
                src="/whish-qr-code.png"
                alt="Whish donation QR code"
                width={200}
                height={200}
                className="support-page__qr-image"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div className="support-page__donation-method">
            <h4 className="support-page__donation-title">OMT (Optimum Money Transfer)</h4>
            <div className="support-page__qr-placeholder">
              <Image
                src="/omt-qr-code.png"
                alt="OMT donation QR code"
                width={200}
                height={200}
                className="support-page__qr-image"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <p className="support-page__footer">
        Thank you for helping make <strong>Where&apos;s My Shattafe</strong> a richer, more accurate resource for everyone!
      </p>
    </div>
  );
}

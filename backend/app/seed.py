
from sqlalchemy import select

from app.db.database import SessionLocal
from app.models import Service


SERVICES = [
    {
        "slug": "sme-growth-diagnosis",
        "domain": "ROOTFIND",
        "name": "SME Growth Diagnosis",
        "description": "Find where a business is losing growth and identify its key growth challenges.",
        "keywords": "SME,growth,diagnosis,business",
        "starting_price": 4999,
        "pricing_unit": "project",
        "duration_min_weeks": 2,
        "duration_max_weeks": 4,
    },
    {
        "slug": "business-position-gap",
        "domain": "ROOTFIND",
        "name": "Business Position Gap",
        "description": "Identify business differentiation opportunities and clarify market positioning.",
        "keywords": "positioning,differentiation,market",
        "starting_price": 4999,
        "pricing_unit": "project",
        "duration_min_weeks": 2,
        "duration_max_weeks": 4,
    },
    {
        "slug": "customer-research-gap",
        "domain": "ROOTFIND",
        "name": "Customer Research Gap",
        "description": "Reveal what customers think, need, and want through customer research.",
        "keywords": "customer,research,insights",
        "starting_price": 4999,
        "pricing_unit": "project",
        "duration_min_weeks": 2,
        "duration_max_weeks": 4,
    },
    {
        "slug": "customer-intelligence",
        "domain": "ROOTFIND",
        "name": "Customer Intelligence",
        "description": "Turn customer insights into actionable customer strategy.",
        "keywords": "customer,intelligence,strategy",
        "starting_price": 4999,
        "pricing_unit": "project",
        "duration_min_weeks": 2,
        "duration_max_weeks": 4,
    },
    {
        "slug": "traditional-to-modern-business",
        "domain": "ROOTBUILD",
        "name": "Traditional Business → Modern Business",
        "description": "Modernise business systems, branding, and go-to-market practices.",
        "keywords": "modernisation,systems,branding",
        "starting_price": 14999,
        "pricing_unit": "project",
        "duration_min_weeks": 4,
        "duration_max_weeks": 8,
    },
    {
        "slug": "founder-to-brand",
        "domain": "ROOTBUILD",
        "name": "Founder → Brand",
        "description": "Transform a business into a powerful, recognisable brand.",
        "keywords": "founder,brand,identity",
        "starting_price": 14999,
        "pricing_unit": "project",
        "duration_min_weeks": 4,
        "duration_max_weeks": 8,
    },
    {
        "slug": "brand-experience-design",
        "domain": "ROOTBUILD",
        "name": "Brand Experience Design",
        "description": "Create consistent and memorable customer experiences.",
        "keywords": "brand,experience,customer",
        "starting_price": 14999,
        "pricing_unit": "project",
        "duration_min_weeks": 4,
        "duration_max_weeks": 8,
    },
    {
        "slug": "revenue-leak-conversion-counselling",
        "domain": "ROOTBUILD",
        "name": "Revenue Leak / Conversion Counselling",
        "description": "Identify the barriers that prevent leads and opportunities from converting into revenue.",
        "keywords": "revenue,conversion,sales",
        "starting_price": 14999,
        "pricing_unit": "project",
        "duration_min_weeks": 4,
        "duration_max_weeks": 8,
    },
    {
        "slug": "customer-lifetime-value",
        "domain": "ROOTGROW",
        "name": "Customer Lifetime Value",
        "description": "Improve retention, repeat purchases, and customer referrals.",
        "keywords": "retention,loyalty,repeat-purchase",
        "starting_price": 24999,
        "pricing_unit": "month",
        "duration_min_weeks": 2,
        "duration_max_weeks": 8,
    },
    {
        "slug": "marketing-os",
        "domain": "ROOTGROW",
        "name": "Marketing OS",
        "description": "Build a structured and measurable marketing system.",
        "keywords": "marketing,systems,measurement",
        "starting_price": 24999,
        "pricing_unit": "month",
        "duration_min_weeks": 2,
        "duration_max_weeks": 8,
    },
    {
        "slug": "fractional-growth-department",
        "domain": "ROOTGROW",
        "name": "Fractional Growth Department",
        "description": "Provide ongoing growth leadership and execution support.",
        "keywords": "growth,leadership,execution",
        "starting_price": 24999,
        "pricing_unit": "month",
        "duration_min_weeks": 2,
        "duration_max_weeks": 8,
    },
]


def seed_services():
    with SessionLocal() as db:
        created = 0
        updated = 0

        for item in SERVICES:
            service = db.scalar(
                select(Service).where(Service.slug == item["slug"])
            )

            if service is None:
                service = Service(**item)
                db.add(service)
                created += 1
            else:
                for key, value in item.items():
                    setattr(service, key, value)
                updated += 1

        db.commit()

        print(f"Service seed completed. Created: {created}, Updated: {updated}")


if __name__ == "__main__":
    seed_services()

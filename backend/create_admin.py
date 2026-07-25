from getpass import getpass

from database import SessionLocal
from routers.models_user import Member
from routers.users import get_password_hash


def main():
    email = input("Admin email: ").strip().lower()
    display_name = input("Display name [Techzeron Admin]: ").strip() or "Techzeron Admin"
    organization_name = input("Organization [Techzeron]: ").strip() or "Techzeron"
    password = getpass("Password: ")
    password_confirm = getpass("Confirm password: ")

    if not email:
        raise SystemExit("Email is required.")

    if len(password) < 8:
        raise SystemExit("Password must be at least 8 characters.")

    if password != password_confirm:
        raise SystemExit("Passwords do not match.")

    db = SessionLocal()

    try:
        member = db.query(Member).filter(Member.email == email).first()

        if member:
            member.password_hash = get_password_hash(password)
            member.display_name = display_name
            member.organization_name = organization_name
            member.role = "admin"
            member.status = "active"
            message = "Existing member updated as admin."
        else:
            member = Member(
                email=email,
                password_hash=get_password_hash(password),
                display_name=display_name,
                organization_name=organization_name,
                role="admin",
                status="active",
            )
            db.add(member)
            message = "New admin account created."

        db.commit()
        db.refresh(member)

        print(message)
        print(f"ID: {member.id}")
        print(f"Email: {member.email}")
        print(f"Role: {member.role}")

    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()

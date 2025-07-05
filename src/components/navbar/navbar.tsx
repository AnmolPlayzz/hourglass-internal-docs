"use client";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {MdArrowOutward, MdCancel, MdLink, MdMenu} from "react-icons/md";
import {useEffect, useState} from "react";


export default function Navbar({children}: { children?: React.ReactNode }) {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(false);
    }, [path])
    return (
        <nav style={{ zIndex: 1000 ,width: "100%", height: 80, padding: "0 20px", overflowY: "auto", display: "flex", alignItems: "center" }}>
            <Link className={path==="/" ? `${styles.topLink} ${styles.active}` : styles.topLink} href={"/"}>
                <div style={{display: "flex", alignItems: "center", borderRadius: "6px", padding: "6px 8px", gap: "1rem", width: "fit-content"}}>
                    <div style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "5px",
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}>
                        <Image src={"/hourglass.svg"} alt={"Tymli Logo"} fill style={{objectFit: "contain"}}/>
                    </div>
                    <h1 style={{fontSize: "18px", fontWeight: 300, margin: 0}}>HG // <span style={{fontWeight: 800}}>Internal Docs</span></h1>
                </div>
            </Link>
            <div className={styles.rightContent}>
                {/*Desktop*/}
                <div className={styles.linkContainer}>
                    <a className={styles.link} href={"https://github.com/Tymli-Inc/desktop"} target={"_blank"}>
                        Desktop <MdArrowOutward/>
                    </a>
                </div>

                {/*Mobile*/}
                <button onClick={() => setIsOpen((v) => !v)} className={styles.button}>
                    {!isOpen ? <MdMenu /> : <MdCancel />}
                </button>
                <div className={isOpen ? `${styles.mobileLinks} ${styles.open}` : styles.mobileLinks}>
                    {children}
                </div>
            </div>
        </nav>
    );
}
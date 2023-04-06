export default function Page404() {
    return (
        <div style={{height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '1000px', display: 'flex', flexDirection: 'column'}}>
                <p style={{fontWeight: '700', fontSize: '50px'}}> 
                    <span style={{fontWeight: '700', color: '#9F0013'}}>
                        404
                    </span> Page Not Found
                </p>
                <p style={{fontSize: '24px', marginTop: '20px'}}>
                    Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.
                </p>
            </div>
        </div>
    );
}
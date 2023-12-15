import React from 'react';

export function Calendar() {
    return (
        <main className="container-fluid text-center">
            <h1>UNDER CONSTRUCTION, NOT PART OF 260 SUBMISSION</h1>
            <h2>Lift History</h2>
            <form method="add">
                <input type="text" id="search" placeholder="Record a workout" />
                <button type="submit" className="btn btn-danger btn-custom">Go</button>
            </form>
            <div className="list-group" style={{ position: 'relative', width: '375px', height: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <span className="nav-back-day prevent-select">&#10094;</span>
                    <div className="display-month">October 2023</div>
                    <span className="nav-forward-day prevent-select">&#10095;</span>
                </div>
                <div style={{ height: 'calc(100% - 40px)' }}>
                    <ul className="weekdays">
                        <li>Su</li>
                        <li>Mo</li>
                        <li>Tu</li>
                        <li>We</li>
                        <li>Th</li>
                        <li>Fr</li>
                        <li>Sa</li>
                    </ul>

                    <ul className="days">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>21</li>
                        <li>22</li>
                        <li>23</li>
                        <li>24</li>
                        <li>25</li>
                        <li>26</li>
                        <li>27</li>
                        <li>28</li>
                        <li><span className="active">29</span></li>
                        <li>30</li>
                        <li>31</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}